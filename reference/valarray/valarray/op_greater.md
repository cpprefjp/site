# operator>
* valarray[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<bool> operator>(const valarray<T>& xs, const valarray<T>& ys); // (1)

  template <class T>
  valarray<bool> operator>(const valarray<T>& xs, const T& y);            // (2)

  template <class T>
  valarray<bool> operator>(const T& x, const valarray<T>& ys);            // (3)
}
```

## 概要
`valarray`において、左辺が右辺より大きいかを判定する。


- (1) : `xs`の各要素が、`ys`の各要素より大きいかを判定する。
- (2) : `xs`の各要素が、`y`より大きいかを判定する。
- (3) : `x`が、`ys`の各要素より大きいかを判定する。


## 戻り値

- (1) : 以下のコードと同等のことを行う：

```cpp
valarray<bool> result(xs.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] > ys[i];
}
return result;
```


- (2) : 以下のコードと同等のことを行う：

```cpp
valarray<bool> result(xs.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] > y;
}
return result;
```


- (3) : 以下のコードと同等のことを行う：

```cpp
valarray<bool> result(ys.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = x > ys[i];
}
return result;
```


## 備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


## 例
```cpp
#include <cassert>
#include <valarray>
#include <algorithm>

void expect_all_true(const std::valarray<bool>& va)
{
  assert((std::all_of(std::begin(va), std::end(va), [](bool b) { return b; })));
}

int main()
{
  const std::valarray<int> a = {4, 5, 6};
  const std::valarray<int> b = {1, 2, 3};
  const std::valarray<int> c = {3, 3, 3};
  const std::valarray<int> d = {1, 1, 1};

  const std::valarray<bool> result1 = a > b;
  expect_all_true(result1);

  const std::valarray<bool> result2 = c > 2;
  expect_all_true(result2);

  const std::valarray<bool> result3 = 2 > d;
  expect_all_true(result3);
}
```
* assert[link /reference/cassert/assert.md]

### 出力
```
```


