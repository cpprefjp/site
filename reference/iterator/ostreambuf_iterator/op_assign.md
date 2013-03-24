#代入演算子
```cpp
ostreambuf_iterator& operator=(CharT c);
```

##概要

<b>値を出力する</b>


##効果

`[failed()](/reference/iterator/ostreambuf_iterator/failed) == false`の場合に`sbuf_->sputc(c);`を行い、そうでなければ何もしない。

※ `sbuf_`はメンバ変数として保持している`streambuf_type`オブジェクトへのポインタ


##戻り値

`*this`

##例

```cpp
```

###出力

```cpp
##参照
```
