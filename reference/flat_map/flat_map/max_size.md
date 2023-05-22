# max_size
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type max_size() const noexcept; // (1) C++23
```

## 概要
コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


## 戻り値
コンテナが自身のコンテンツとして保持できる要素の最大数。 
メンバ型 `size_type` は符号なし整数型である。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<char, int> fm;

  std::cout << fm.max_size() << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
178956970
```

## 言語バージョン
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

