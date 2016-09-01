#streamoff
* ios[meta header]
* std[meta namespace]
* typedef[meta id-type]

```cpp
namespace std {
  typedef implementation-defined streamoff;
}
```

`streamoff`は、処理系依存の符号つき整数型のtypedefである。ファイルサイズとして有り得る最大値を表現できることとされている。
典型的には、long long型のtypedefであることが想定される。

ただし、C++03に準拠した実装ではlong型のtypedefであるものも存在するため、注意が必要である。C++03ではlong long型が存在しなかったためである。
