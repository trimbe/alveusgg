import type { InferGetStaticPropsType, NextPageContext, NextPage } from "next";

import { getAdminSSP } from "@/server/utils/admin";
import { permissions } from "@/config/permissions";

import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import Meta from "@/components/content/Meta";
import { FormForm } from "@/components/admin/forms/FormForm";
import { Headline } from "@/components/admin/Headline";
import { Panel } from "@/components/admin/Panel";

export async function getServerSideProps(context: NextPageContext) {
  const adminProps = await getAdminSSP(context, permissions.manageForms);
  if (!adminProps) {
    return { notFound: true };
  }

  return { props: adminProps };
}

const AdminCreateFormPage: NextPage<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ menuItems }) => {
  return (
    <>
      <Meta title="Create Form | Admin" />

      <AdminPageLayout title="Create Form" menuItems={menuItems}>
        <Headline>Create new Form</Headline>

        <Panel>
          <FormForm action="create" />
        </Panel>
      </AdminPageLayout>
    </>
  );
};
export default AdminCreateFormPage;
