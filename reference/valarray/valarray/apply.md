# apply
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T> apply(T func(T)) const;
valarray<T> apply(T func(const T&)) const;
```

## 概要
各要素に任意の関数を適用する。


## 戻り値
`*this`の全ての要素に関数`func`を適用した`valarray`オブジェクトを新たに作って返す。

返される`valarray`オブジェクトは、`*this`と同じ要素数、同じ要素型を持つ。


## 備考
- `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> va = {1, 2, 3};

  // 全要素を+1する
  std::valarray<int> result = va.apply([](int x) { return x + 1; });

  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* apply[color ff0000]

### 出力
```
2
3
4
```


