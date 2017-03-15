# resize
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
void resize(size_t sz, T c = T());
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
要素数を変更する。


## 効果
`sz <` [`size()`](size.md)の場合、要素数を`sz`に減少させる。

`sz >` [`size()`](size.md)の場合、要素数を`sz`に増加させる。

要素数を減少または増加させた後、全ての要素をパラメータ`c`のコピーに設定する。


## 戻り値
なし


## 備考
この関数が呼び出されることで、イテレータおよび要素への参照が無効になる可能性がある。


## 例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> va = {1, 2, 3};

  // 要素数を3から2に減少させる
  va.resize(2);

  for (int x : va) {
    std::cout << x << ", ";
  }
  std::cout << std::endl;

  // 要素数を5に増加させる。値8で埋める
  va.resize(5, 8);

  for (int x : va) {
    std::cout << x << ", ";
  }
  std::cout << std::endl;
}
```


### 出力
```
0, 0, 
8, 8, 8, 8, 8, 
```

