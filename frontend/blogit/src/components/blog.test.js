import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'
import Blogform from './Blogform'


describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog="view">
        <div className="testDiv" />
      </Blog>
    )
  })

  test('tiedot piilossa', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('blogilistan testit, step2', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('blogilistan testit, step1', () => {

    const blog = {
      title: '5 Computer Science Blogs for Students',
      author: 'computersciencedegreehub',
    }
  
    const component = render(
      <Blog blog={blog} />
    )
  
    expect(component.container).toHaveTextContent(
      '5 Computer Science Blogs for Students',
    )
  })



})