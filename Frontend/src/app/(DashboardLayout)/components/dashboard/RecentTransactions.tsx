"use clinet";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography } from "@mui/material";
import { RecentTransactionsProps, Destination } from "@/utils/types/types";
import { useState } from "react";
import { time } from "console";

const RecentTransactions = ({ destinations }: RecentTransactionsProps) => {
  const [role, setRole] = useState<string>("Transporter");
  const [appdateDestinations, setAppdateDestinations] =
    useState<Destination[]>(destinations);

  ///////////////////////////////////////
  function updateDestinations() {
    // Function to get the current time in hh:mm am/pm format
    const now = new Date();
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "pm" : "am";
    const time = `${hours}:${minutes} ${ampm}`;

    // Geolocation API to get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Reverse geocoding to get the location name or fallback to coordinates
          const locationName = await getLocationName(latitude, longitude);

          // Construct the content based on location
          const content = `User is currently at ${locationName}`;

          // Define the color based on the location tracking
          // const color = "info"; // You can set different logic if needed

          // Create the destination object
          const destination: Destination = {
            time: time,
            content: content,
            color: "error",
            latitude: latitude,
            longitude: longitude,
          };

          // Log or update the destination as needed

          setAppdateDestinations([...appdateDestinations, destination]);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Helper function to get the location name using reverse geocoding (Nominatim API)
  async function getLocationName(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if city, town, or village is available, otherwise fallback to coordinates
      const locationName =
        data.address.city || data.address.town || data.address.village;

      // Return location name if available, otherwise return coordinates
      return locationName
        ? locationName
        : `Latitude: ${latitude}, Longitude: ${longitude}`;
    } catch (error) {
      console.error("Error fetching location name: ", error);
      return `Latitude: ${latitude}, Longitude: ${longitude}`;
    }
  }

  ///////////////////////////////////
  function OpenInGoogleMap(latitude: number, longtude: number) {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longtude}`;
    window.open(url, "_blank");
  }

  ////////////////////////////////

  return (
    <DashboardCard title="Recent Transactions">
      <>
        {role === "Transporter" && (
          <div className="flex justify-end">
            <button
              onClick={updateDestinations}
              className="border p-2 mb-2 bg-palette-primary-main text-palette-primary-light hover:bg-palette-primary-dark  hover:font-semibold rounded-md"
            >
              Update Destinations
            </button>
          </div>
        )}
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: "-40px",
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {appdateDestinations.map((destination, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{
                  flex: 0.5,
                  paddingLeft: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {destination.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={destination.color}
                  sx={{
                    width: "12px",
                    height: "12px",
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body2" component="span">
                  <span
                    onClick={() =>
                      OpenInGoogleMap(
                        destination.latitude,
                        destination.longitude
                      )
                    }
                    className="cursor-pointer"
                  >
                    {destination.content}
                  </span>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
