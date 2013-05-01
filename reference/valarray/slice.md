#slice
```cpp
namespace std {
  class slice {
  public:
    slice();
    slice(size_t, size_t, size_t);
    size_t start() const;
    size_t size() const;
    size_t stride() const;
  };
}
```

##概要

std::valarray テンプレートクラスの operator[] メンバ関数にスライスの指示を与える為のヘルパークラス。



| | |
|-----------------------|--------------------------------------------------------|
| start | スライスを生成する初期位置 |
| size | 生成するスライスの要素数 |
| stride | スライスを生成する間隔 |
参照
使用例については [std::valarray](/reference/valarray/valarray.md) の例を参照。
