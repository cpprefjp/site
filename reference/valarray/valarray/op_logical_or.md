#operator||
* valarray[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  valarray<bool> operator||(const valarray<T>& xs, const valarray<T>& ys); // (1)

  template <class T>
  valarray<bool> operator||(const valarray<T>& xs, const T& y);            // (2)

  template <class T>
  valarray<bool> operator||(const T& x, const valarray<T>& ys);            // (3)
}
```

##概要
`valarray`において、左辺と右辺の式の論理和をとる。


- (1) : `xs`の各要素と、`ys`の各要素の論理和をとる。
- (2) : `xs`の各要素と、`y`の論理和をとる。
- (3) : `x`と、`ys`の各要素の論理和をとる。


##要件
型`T`が`bool`に変換可能であること。


##戻り値

- (1) : 以下のコードと同等のことを行う：

```cpp
valarray<bool> result(xs.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] || ys[i];
}
return result;
```


- (2) : 以下のコードと同等のことを行う：

```cpp
valarray<bool> result(xs.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] || y;
}
return result;
```


- (3) : 以下のコードと同等のことを行う：

```cpp
valarray<bool> result(ys.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = x || ys[i];
}
return result;
```


##備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <cassert>
#include <valarray>

int main()
{
  const std::valarray<bool> a = {true, false, true};
  const std::valarray<bool> b = {true, false, false};

  const std::valarray<bool> result1 = a || b;
  assert(result1[0]);
  assert(!result1[1]);
  assert(result1[2]);

  const std::valarray<bool> result2 = a || true;
  assert(result2[0]);
  assert(result2[1]);
  assert(result2[2]);

  const std::valarray<bool> result3 = true || a;
  assert(result3[0]);
  assert(result3[1]);
  assert(result3[2]);
}
```

###出力
```
```


