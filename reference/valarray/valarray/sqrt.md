# sqrt
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> sqrt(const valarray<T>& va);
}
```

## 概要
平方根（square root）を得る。


## 戻り値
以下のコードと同等のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::sqrt));
```
* apply[link apply.md]
* std::sqrt[link /reference/cmath/sqrt.md]


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {1.0f, 2.0f, 3.0f};

  std::valarray<float> result = std::sqrt(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::sqrt[color ff0000]

### 出力
```
1
1.41421
1.73205
```


