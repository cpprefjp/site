# operator-=
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T>& operator-=(const valarray<T>& xs); // (1)
valarray<T>& operator-=(const T& x);            // (2)
```

## 概要
減算の複合演算を行う。

- (1) : `*this`の各要素から、`xs`の各要素を減算する。
- (2) : `*this`の各要素から、`x`を減算する。


## 効果
- (1) : 以下のコードと同等のことを行う：

```cpp
for (std::size_t i = 0; i < size(); ++i) {
  (*this)[i] -= xs[i];
}
```
* size()[link size.md]

- (2) : 以下のコードと同等のことを行う：

```cpp
for (std::size_t i = 0; i < size(); ++i) {
  (*this)[i] -= x;
}
```
* size()[link size.md]


## 戻り値
`*this`


## 備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


## 例
```cpp
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& va)
{
  std::cout << name << " : {";
  bool first = true;

  for (const T& x : va) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  const std::valarray<int> a = {4, 5, 6};
  const std::valarray<int> b = {1, 2, 3};

  std::valarray<int> result1 = a;
  result1 -= b;
  print("valarray-=valarray", result1);

  std::valarray<int> result2 = a;
  result2 -= 1;
  print("valarray-=int", result2);
}
```

### 出力
```
valarray-=valarray : {3,3,3}
valarray-=int : {3,4,5}
```


