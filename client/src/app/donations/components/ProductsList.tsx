import NoDataHandler from "@/components/noDataHandler";

export default function ProductsPage() {
  return (
    <NoDataHandler data={[]} alreadyFetched={true}>
      <div>Products content will be here</div>
    </NoDataHandler>
  );
}
