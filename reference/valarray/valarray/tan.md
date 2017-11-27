# tan
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> tan(const valarray<T>& va);
}
```

## 概要
正接（タンジェント：tangent）を得る。


## 戻り値
以下のコードと同等のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::tan));
```
* apply[link apply.md]
* std::tan[link /reference/cmath/tan.md]


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::tan(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::tan[color ff0000]

### 出力
```
0.100335
0.20271
0.309336
```


