# exp
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  valarray<T> exp(const valarray<T>& va);
}
```

## 概要
自然対数の底 e（ネイピア数）の累乗を得る。exp は exponent（指数）、あるいは、exponential function（指数関数）の略。


## 戻り値
以下のコードと等価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::exp));
```
* apply[link apply.md]
* std::exp[link /reference/cmath/exp.md]


## 備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::exp(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::exp[color ff0000]

### 出力
```
1.10517
1.2214
1.34986
```


