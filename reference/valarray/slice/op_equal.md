# operator==
* valarray[meta header]
* std[meta namespace]
* slice[meta class]
* function[meta id-type]

```cpp
friend bool operator==(const slice& x, const slice& y);
```

## 概要
`slice`オブジェクトの等値比較を行う。


## 効果
以下と等価：

```cpp
return x.start() == y.start() &&
       x.size() == y.size() &&
       x.stride() == y.stride();
```
* start()[link start.md]
* size()[link size.md]
* stride()[link stride.md]


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <valarray>
#include <cassert>

int main()
{
  std::slice s1{3, 5, 7};
  std::slice s2{3, 5, 7};
  std::slice s3{3, 5, 6};

  assert(s1 == s2);
  assert(s1 != s3);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
