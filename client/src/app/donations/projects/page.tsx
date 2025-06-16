import NoDataHandler from "@/components/noDataHandler";

export default function ProjectsPage() {
  return (
    <NoDataHandler data={[]} alreadyFetched={true}>
      <div>Projects content will be here</div>
    </NoDataHandler>
  );
}
