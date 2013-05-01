#gslice
```cpp
namespace std {
  class gslice {
  public:
    gslice();
    gslice(size_t s, const valarray<size_t>& l, const valarray<size_t>& d);
    size_t
    start() const;
    valarray<size_t> size() const;
    valarray<size_t> stride() const;
  };
}
```

##概要
[std::slice](/reference/valarray/slice.md) をより一般化したスライス指示用のヘルパークラス。


| | |
|------------------|-------------------------------------------------------------------------|
| s | スライスを生成する初期位置 |
| l | 生成するスライスの要素数列の std::valarray |
| d | スライスを生成する間隔数列の std::valarray |
参照
使用例については [std::valarray](/reference/valarray/valarray.md) の例を参照。
