#apply
* valarray[meta header]
* std[meta namespace]

```cpp
valarray<T> apply(T func(T)) const;
valarray<T> apply(T func(const T&)) const;
```

##概要
各要素に任意の関数を適用する。


##戻り値
`*this`の全ての要素に関数`func`を適用した`valarray`オブジェクトを新たに作って返す。

返される`valarray`オブジェクトは、`*this`と同じ要素数、同じ要素型を持つ。


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> v = {1, 2, 3};

  // 全要素を+1する
  std::valarray<int> result = v.apply([](int x) { return x + 1; });

  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* apply[color ff0000]

###出力
```
2
3
4
```


