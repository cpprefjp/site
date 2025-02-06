# empty
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
[[nodiscard]] bool empty() const noexcept; // (1) C++23
```

## 概要
コンテナが空かどうかをテストする。 
コンテナが空（[`size()`](size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](clear.md) メンバ関数を使用する。


## 戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false` を返す。


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main ()
{
  std::flat_multiset<int> fs;

  std::cout << fs.empty() << std::endl;

  fs.insert(42);

  std::cout << fs.empty() << std::endl;
}
```
* empty()[color ff0000]
* fs.insert[link insert.md]

### 出力
```
1
0
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
