# streamoff
* ios[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using streamoff = implementation-defined;
}
```

`streamoff`は、処理系依存の符号つき整数型の別名である。ファイルサイズとして有り得る最大値を表現できることとされている。
典型的には、`long long`型の別名であることが想定される。

ただし、C++03に準拠した実装では`long`型の別名であるものも存在するため、注意が必要である。C++03では`long long`型が存在しなかったためである。
