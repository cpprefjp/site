# log10
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> log10(const valarray<T>& va);
}
```

## 概要
常用対数（10 を底とした対数）を得る。log は logarithm（対数）、あるいは、logarithmic function（対数関数）の略。


## 戻り値
以下のコードと同等のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::log10));
```
* apply[link apply.md]
* log10[link /reference/cmath/log10.md]


## 例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {100.0f, 10000.0f, 1000000.0f};

  std::valarray<float> result = std::log10(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* log10[color ff0000]

### 出力
```
2
4
6
```


