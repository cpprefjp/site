# operator=
* iterator[meta header]
* std[meta namespace]
* ostream_iterator[meta class]
* function[meta id-type]

```cpp
ostream_iterator<T, CharT, Traits>& operator=(const T& value);
```

## 概要
値を出力する


## 効果
```cpp
*out_stream << value;
if(delim != 0)
  *out_stream << delim;
return *this;
```

`out_stream`は、コンストラクタで�定された出力ストリームオブジェクトへのポインタ`delim`は、コンストラクタで�定された区切り文�列。


## 例
```cpp
```

### 出力
```
```

## 参照
