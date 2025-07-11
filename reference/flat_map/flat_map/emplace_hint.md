# emplace_hint
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
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
新たな要素が追加された場合、その追加された要素を指すイテレータ。新たな要素が追加されなかった場合、既にあった要素を指すイテレータ。


## 計算量

操作の前のコンテナサイズ（[`size()`](size.md)）を`N`とすると、`O(N)`（挿入が行われなかった場合は`O(log N)`より小さくなる可能性がある）。

## 備考
- [`try_emplace`](try_emplace.md) と異なり、たとえ要素が挿入されなかった場合でも `value_type` 型のオブジェクトが構築される可能性があり、結果として引数 `args` が [`move`](/reference/utility/move.md) の対象となって変更されてしまっている可能性があるため、注意が必要である。


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm;

  fm.emplace(1, 'A');

  // キー2の要素が最後尾に追加されることが事前にわかっているので、fm.end()をヒントとして与える
  fm.emplace_hint(fm.end(), 2, 'B');

  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* emplace_hint[color ff0000]
* fm.emplace[link emplace.md]
* fm.end()[link end.md]

### 出力
```
1 : A
2 : B
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`flat_map::insert`](insert.md)                     | 要素を挿入する                             |
| [`flat_map::insert_range`](insert_range.md)         | Rangeを挿入する                            |
| [`flat_map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`flat_map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`flat_map::try_emplace`](try_emplace.md)           | キーが存在しない場合のみ要素を直接構築する |
