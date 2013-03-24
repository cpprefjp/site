#代入演算子
```cpp
ostream_iterator<T, CharT, Traits>& operator=(const T& value);
```

##概要

<b>値を出力する</b>


##効果

`*out_stream << value;``if(delim != 0)`
`  *out_stream << delim ;`
`return *this;`

``
`out_stream`は、コンストラクタで設定された出力ストリームオブジェクトへのポインタ`delim`は、コンストラクタで設定された区切り文字列


##例

```cpp
```

###出力

```cpp
##参照
```
