# emplace
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <class... Args>
iterator emplace(Args&&... args);
```

## 概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


## パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。


## テンプレートパラメータ制約
- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`pair`](/reference/utility/pair.md)`<key_type, mapped_type>, Arg...>`が`true`であること


## 戻り値
挿入された要素へのイテレータを返す。


## 例
```cpp example
#include <flat_map>
#include <iostream>

int main()
{
  std::flat_multimap<int, char> fm;

  // キーと値のpairを作ることなく挿入できる
  fm.emplace(3, 'A');
  fm.emplace(1, 'B');
  fm.emplace(4, 'C');
  fm.emplace(3, 'D');

  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* emplace[color ff0000]

#### 出力
```
1 : B
3 : A
3 : D
4 : C
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                                             | 説明                             |
|--------------------------------------------------|----------------------------------|
| [`flat_multimap::insert`](insert.md)             | 要素を挿入する                   |
| [`flat_multimap::insert_range`](insert_range.md) | Rangeを挿入する                  |
| [`flat_multimap::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |
