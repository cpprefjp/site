#operator*=
* valarray[meta header]
* std[meta namespace]
* mask_array[meta class]
* function[meta id-type]

```cpp
void operator*=(const valarray<T>& xs) const;
```

##概要
乗算の複合代入を行う。


##効果
元となる`valarray`オブジェクトから参照によって抽出した各要素に、`xs`の各要素を乗算する。


##戻り値
なし


##備考
`valarray`から抽出した要素数と`xs`の要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> v = {1, 2, 3, 4, 5, 6};
  std::valarray<bool> mask = {false, true, false, true, false, true};

  std::mask_array<int> result = v[mask];

  // 抽出した要素に2を乗算する
  result *= std::valarray<int>(2, 3);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```

###出力
```
1
4
3
8
5
12
```


