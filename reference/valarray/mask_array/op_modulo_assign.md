#operator%=
* valarray[meta header]
* std[meta namespace]

```cpp
void operator%=(const valarray<T>& xs) const;
```

##概要
剰余算の複合代入を行う。


##効果
元となる`valarray`オブジェクトから参照によって抽出した各要素に、`xs`の各要素を剰余算する。


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

  // 抽出した要素に3を剰余算する
  result %= std::valarray<int>(3, 3);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```

###出力
```
1
2
3
1
5
0
```


