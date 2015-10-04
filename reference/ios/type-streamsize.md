#streamsize
* ios[meta header]
* std[meta namespace]
* typedef[meta id-type]

```cpp
namespace std {
  typedef implementation-defined streamsize;
}
```
* implementation-defined[italic]

`streamsize`は、処理系依存の符号つき整数型のtypedefである。入出力操作でのバイト数やバッファサイズなどの表現を目的とする。
典型的には、std::size_tに対応する符号つき整数型（言い換えればPOSIXのssize_t型）が想定される。
