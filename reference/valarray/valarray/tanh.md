#tanh
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> tanh(const valarray<T>& v);
}
```

##概要
双曲線正接（ハイパボリックタンジェント：hyperbolic tangent）を得る。


##戻り値
以下のコードと同等のことを行う：

```cpp
return v.apply(static_cast<T(*)(T)>(std::tanh));
```
* apply[link ./apply.md]
* tanh[link /reference/cmath/tanh.md]


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> v = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::tanh(v);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* tanh[color ff0000]

###出力
```
0.099668
0.197375
0.291313
```


