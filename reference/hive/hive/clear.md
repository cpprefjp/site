# clear
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void clear() noexcept; // C++26
```

## 概要
全ての要素を削除する。


## 効果
`hive`オブジェクトが管理している全ての要素を破棄する。この呼び出しの後、[`size()`](size.md)は`0`を返す。


## 戻り値
なし


## 例外
投げない


## 計算量
線形時間。全ての要素に対してデストラクタを呼び出す。


## 備考
要素を指す全ての参照、ポインタ、イテレータは無効になる。終端イテレータ（past-the-end iterator）は無効にならない。


## 例
```cpp example
#include <hive>
#include <print>
#include <cassert>

int main()
{
  std::hive<int> h;
  h.insert(1);
  h.insert(2);
  h.insert(3);

  h.clear();

  assert(h.empty());
  std::println("size = {}", h.size());
}
```
* clear()[color ff0000]
* h.insert[link insert.md]
* h.empty()[link empty.md]
* h.size()[link size.md]

### 出力
```
size = 0
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目

| 名前                | 説明             |
|---------------------|------------------|
| [`erase`](erase.md) | 要素を削除する   |


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
