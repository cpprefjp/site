# atan
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> atan(const valarray<T>& va);
}
```

## 概要
逆正接（アークタンジェント：arc tangent）を得る。


## 戻り値
以下のコードと等価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::atan));
```
* apply[link apply.md]
* std::atan[link /reference/cmath/atan.md]


##備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::atan(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::atan[color ff0000]

### 出力
```
0.0996687
0.197396
0.291457
```


