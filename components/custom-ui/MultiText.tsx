"use client";

import React, { useState } from 'react'

import { Input } from '../ui/input'
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface MUltiTextProps {
  values: string[],
  onChange: (value:string) => void,
  onRemove: (value: string) => void
}

const MultiText: React.FC<MUltiTextProps> = ({values, onChange, onRemove}) => {
  const [inputValue, setInputValue] = useState('');

  const addValue = (item: string) => {
    onChange(item);
    setInputValue('');
  }

  return (
    <div className='mb-3'>
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />
      <div className='flex mt-4 gap-1 flex-wrap'>
        {values.map((item, index) => (
          <Badge key={index} className='bg-grey-1 text-white'>
            <span className='ml-1'>{item}</span>
            <button className='ml-1 rounded-lg outline-none text-red-1' onClick={() => onRemove(item)}>
              <X className='h-3 w-3'/>
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default MultiText
