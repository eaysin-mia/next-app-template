import { Avatar, Button, Card, CloseButton } from "@heroui/react";

export function HeroConstellation() {
  return (
    <div className="hidden md:flex w-full items-center justify-center">
      <div className="grid w-full grid-cols-12 gap-2.5 px-0">
        {/* Row 2 */}
        <div className="col-span-12 grid grid-cols-12 gap-2">
          {/* Left Column */}
          <div className="col-span-12 grid grid-cols-12 gap-2 lg:col-span-6">
            {/* Top Card */}
            {/* Red Indicator Card — HeroUI tokens, Shop design system */}
            <Card className="col-span-12 rounded-[28px] bg-surface shadow-sm-2 relative overflow-hidden">
              <div className="absolute end-3 top-3 z-10">
                <CloseButton aria-label="Dismiss notification" />
              </div>
              <Card.Header className="gap-3 pe-10">
                {/* Avatar with danger dot indicator */}
                <div className="relative shrink-0">
                  <img
                    alt="Product"
                    className="size-[40px] rounded-[20px] object-cover"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                  />
                  <span
                    className="absolute -end-0.5 -top-0.5 size-[10px] rounded-full bg-danger border-2 border-surface"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-danger">
                    New activity
                  </span>
                  <Card.Title className="text-sm text-foreground tracking-[-0.014em]">
                    Someone liked your product
                  </Card.Title>
                  <span className="text-[11px] text-muted">2 min ago</span>
                </div>
              </Card.Header>
            </Card>
            {/* Bottom cards */}
            <div className="col-span-12 grid grid-cols-12 gap-2">
              {/* Left Card */}
              <Card className="col-span-12 gap-1 sm:col-span-6">
                <Card.Header>
                  <Avatar className="size-[32px] rounded-lg">
                    <Avatar.Image
                      alt="Demo 1"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content className="mt-0">
                  <p className="text-sm leading-4 font-medium">Indie Hackers</p>
                  <p className="text-xs text-muted">148 members</p>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2">
                  <Avatar className="size-4">
                    <Avatar.Image
                      alt="John"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
                  <p className="text-xs text-muted">By John</p>
                </Card.Footer>
              </Card>
              {/* Right Card */}
              <Card className="col-span-12 gap-1 sm:col-span-6">
                <Card.Header>
                  <Avatar className="size-[32px] rounded-lg">
                    <Avatar.Image
                      alt="Demo 2"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
                    />
                    <Avatar.Fallback>AB</Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content className="mt-0">
                  <p className="text-sm leading-4 font-medium">AI Builders</p>
                  <p className="text-xs text-muted">362 members</p>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2">
                  <Avatar className="size-4">
                    <Avatar.Image
                      alt="John"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                    />
                    <Avatar.Fallback>M</Avatar.Fallback>
                  </Avatar>
                  <p className="text-xs text-muted">By Martha</p>
                </Card.Footer>
              </Card>
            </div>
          </div>
          {/* Right Column */}
          <Card className="col-span-12 min-h-[100px] overflow-hidden rounded-3xl lg:col-span-6">
            {/* Background image */}
            <img
              alt="NEO Home Robot"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg"
            />

            {/* Header */}
            <Card.Header className="z-10 text-white">
              <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
                NEO
              </Card.Title>
              <Card.Description className="text-sm leading-5 font-medium text-black/50">
                Home Robot
              </Card.Description>
            </Card.Header>

            {/* Footer */}
            <Card.Footer className="z-10 mt-auto flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-black">
                  Available soon
                </div>
                <div className="text-xs text-black/60">Get notified</div>
              </div>
              <Button
                className="bg-white text-black"
                size="sm"
                variant="tertiary"
              >
                Notify me
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}
