# streamsize
* ios[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using streamsize = implementation-defined;
}
```

`streamsize`は、処理系依�の符号つき整数型の別名である。入出力操作でのバイト数やバッファサイズなどの表現を目的とする。
典型的には、[`std::size_t`](/reference/cstddef/size_t.md)に対応する符号つき整数型（言い換えればPOSIXの`ssize_t`型）が想定される。
