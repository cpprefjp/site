# emplace
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool> emplace(Args&&... args);
```

## 概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


## パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。


## テンプレートパラメータ制約
- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<value_type, Arg...>`が`true`であること。


## 効果
`value_type`型の変数`t`を[`forward`](/reference/utility/forward.md)`<Args>(args)...`で初期化する。このコンテナが`t`と等価なキーをすでにもっている場合、`*this`を変更しない。そうでない場合、キーを格納しているコンテナを`c`、とすると、以下と等価：

```cpp
auto it = ranges::upper_bound(c, t, value_comp());
c.insert(it, std::move(t));
```
* value_comp()[link value_comp.md]
* insert[link /reference/vector/vector/insert.md]
* std::move[link /reference/utility/move.md]


## 戻り値
挿入されたかどうかを示す `bool` と、挿入された要素へのイテレータからなる [`pair`](/reference/utility/pair.md) を返す。挿入されなかったときは、既存要素へのイテレータを返す。


## 例
### 単純な挿入の例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs;

  fs.emplace(3);
  fs.emplace(1);
  fs.emplace(4);

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* emplace[color ff0000]

#### 出力
```
1
3
4
```

### コンストラクタ引数を渡す例
```cpp example
#include <flat_set>
#include <iostream>
#include <iterator>
#include <string>

int main()
{
  std::flat_set<std::string> fs;
  const char aaa[3] = {'A', 'A', 'A'};

  fs.emplace(5, 'C');
  fs.emplace("BBBB");
  fs.emplace(std::begin(aaa), std::end(aaa));

  for (const std::string& i : fs) {
    std::cout << i << std::endl;
  }
}
```
* emplace[color ff0000]

#### 出力
```
AAA
BBBB
CCCCC
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                        | 説明                                       |
|---------------------------------------------|--------------------------------------------|
| [`flat_set::insert`](insert.md)             | 要素を挿入する                             |
| [`flat_set::insert_range`](insert_range.md) | Rangeを挿入する                            |
| [`flat_set::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する           |
