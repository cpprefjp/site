# emplace_hint
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class... Args>
iterator emplace_hint(const_iterator hint, Args&&... args); // C++26
```

## 概要
ヒント付きで要素を直接構築で挿入する。

この関数の引数`args...`は、要素型`T`のコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。

第1引数`hint`は挿入位置のヒントであるが、`hive`の挿入位置はコンテナが決定するため、この引数は無視される。この関数は、他のコンテナと同じインタフェースで扱えるようにするために提供されている。


## 適格要件
型`T`が、`args...`から`hive`コンテナへの`EmplaceConstructible`であること。


## 効果
`std::forward<Args>(args)...`で構築した型`T`のオブジェクトを挿入する。`hint`引数は無視される。

例外が送出された場合、副作用は生じない。


## 戻り値
新たに挿入された要素を指すイテレータ。


## 計算量
定数時間。型`T`のオブジェクトがちょうど1個構築される。


## 備考
この関数呼び出しにより、終端イテレータ（past-the-end iterator）は無効になる。削除されなかった既存要素へのポインタ・参照・イテレータは無効にならない。

引数`args...`は、直接的または間接的に`*this`が保持する値を参照してもよい。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;

  // hintは無視される。emplaceと同じく直接構築で挿入する
  h.emplace_hint(h.begin(), 1);
  h.emplace_hint(h.end(), 2);

  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* emplace_hint[color ff0000]
* h.begin()[link begin.md]
* h.end()[link end.md]

### 出力例
```
1 2 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目

| 名前                              | 説明                     |
|-----------------------------------|--------------------------|
| [`emplace`](emplace.md)           | 要素を直接構築で挿入する |
| [`insert`](insert.md)             | 要素を挿入する           |
| [`insert_range`](insert_range.md) | Rangeの要素を挿入する    |


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
