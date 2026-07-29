# erase
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
iterator erase(const_iterator position);                     // (1) C++26
iterator erase(const_iterator first, const_iterator last);   // (2) C++26
```

## 概要
指定された要素をコンテナから削除する。


## 要件
- (1) : `position`が間接参照可能なイテレータであること
- (2) : `[first, last)`が有効なイテレータ範囲であること


## 効果
- (1) : `position`が指す要素を削除する
- (2) : イテレータ範囲`[first, last)`の要素を削除する


## 戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](end.md)を返す。


## 例外
投げない


## 計算量
削除される要素数に比例して線形時間。加えて、この関数呼び出しの結果としてアクティブな要素ブロックのいずれかが空になる場合、最悪でも要素ブロック数に比例して線形時間。


## 備考
削除された要素を指す参照・ポインタ・イテレータは無効になる。削除されなかった要素へのポインタ・参照・イテレータは無効にならない。

`*this`の最後の要素を削除する操作は、終端イテレータ（past-the-end iterator）も無効にする。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;
  for (int i = 1; i <= 5; ++i) {
    h.insert(i);
  }

  // 値が3の要素を削除する
  for (auto it = h.begin(); it != h.end();) {
    if (*it == 3) {
      // 削除された要素の次を指すイテレータが返される
      it = h.erase(it);
    }
    else {
      ++it;
    }
  }

  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
  std::println("size = {}", h.size());
}
```
* erase[color ff0000]
* h.begin()[link begin.md]
* h.end()[link end.md]
* h.size()[link size.md]

### 出力例
```
1 2 4 5 
size = 4
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目

| 名前                    | 説明                     |
|-------------------------|--------------------------|
| [`clear`](clear.md)     | 全要素を削除する         |
| [`insert`](insert.md)   | 要素を挿入する           |


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
