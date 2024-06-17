/* eslint-disable jsx-a11y/anchor-has-content */

const Loading = () => {
  return (
    <>
      {/*<div class="flex justify-center items-center">
  <div class="h-10 w-10 bg-gray-900 rounded-full animate-pulse"></div>
</div>*/}
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    </>
  )
}

export default Loading
