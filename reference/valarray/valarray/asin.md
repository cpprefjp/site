#asin
* valarray[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  valarray<T> asin(const valarray<T>& v);
}
```

##概要
逆正弦（アークサイン：arc sine）を得る。


##戻り値
以下のコードと同等のことを行う：

```cpp
return v.apply(static_cast<T(*)(T)>(std::asin));
```
* apply[link ./apply.md]
* asin[link /reference/cmath/asin.md]


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> v = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::asin(v);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* asin[color ff0000]

###出力
```
0.0998334
0.198669
0.29552
```


