#operator=
* iterator[meta header]
* std[meta namespace]
* ostreambuf_iterator[meta class]
* function[meta id-type]

```cpp
ostreambuf_iterator& operator=(CharT c);
```

##概要
値を出力する


##効果
[`failed()`](./failed.md)` == false`の場合に`sbuf_->sputc(c);`を行い、そうでなければ何もしない。

※ `sbuf_`はメンバ変数として保持している`streambuf_type`オブジェクトへのポインタ


##戻り値
`*this`

##例
```cpp
```

###出力
```
```

##参照
