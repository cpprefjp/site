# emplace_hint
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <class... Args>
iterator emplace_hint(const_iterator hint, Args&&... args);
```

## 概要
要素が配置されるべき場所を示唆するパラメータ `hint` を使って、コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数と同じ引数で呼ばれる。


## パラメータ
- `hint` : 新しい要素をどこへ挿入するかを示唆するために使われるイテレータ
- `args...` : 要素のコンストラクタへ転送される引数パック


## 戻り値
追加された要素を指すイテレータ。


## 計算量
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4};

  // キー5の要素が最後尾に追加されることが事前にわかっているので、fs.end()をヒントとして与える
  fs.emplace_hint(fs.end(), 5);

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* emplace_hint[color ff0000]
* fs.end()[link end.md]

### 出力
```
1
3
4
5
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                                             | 説明               |
|--------------------------------------------------|--------------------|
| [`flat_multiset::insert`](insert.md)             | 要素を挿入する     |
| [`flat_multiset::insert_range`](insert_range.md) | Rangeを挿入する    |
| [`flat_multiset::emplace`](emplace.md)           | 要素を直接構築する |
