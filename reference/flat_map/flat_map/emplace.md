# emplace
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
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
- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`pair`](/reference/utility/pair.md)`<key_type, mapped_type>, Arg...>`が`true`であること


## 効果
[`pair`](/reference/utility/pair.md)`<key_type, mapped_type>`型の変数`t`を[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`で初期化する。このコンテナが`t.first`と等価なキーをすでにもっている場合、`*this`を変更しない。そうでない場合、以下と等価：

```cpp
auto key_it = ranges::upper_bound(c.keys, t.first, compare);
auto value_it = c.values.begin() + distance(c.keys.begin(), key_it);
c.keys.insert(key_it, std::move(t.first));
c.values.insert(value_it, std::move(t.second));
```
* c.keys[link containers.md]
* c.values[link containers.md]
* begin()[link /reference/vector/vector/begin.md]
* distance[link /reference/iterator/distance.md]
* insert[link /reference/vector/vector/insert.md]
* std::move[link /reference/utility/move.md]


## 戻り値
挿入されたかどうかを示す `bool` と、挿入された要素へのイテレータからなる [`pair`](/reference/utility/pair.md) を返す。挿入されなかったときは、既存要素へのイテレータを返す。


## 例
### 単純なキー・値を挿入する例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm;

  // キーと値のpairを作ることなく挿入できる
  fm.emplace(3, 'A'); // キー3と、値'A'を挿入
  fm.emplace(1, 'B');
  fm.emplace(4, 'C');

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
4 : C
```

### キーと値もそれぞれコンストラクタ引数を渡す例
```cpp example
#include <iostream>
#include <flat_map>
#include <string>
#include <tuple>

struct Point {
  int x, y;
  Point(int x, int y) : x(x), y(y) {}
};

int main()
{
  std::flat_map<std::string, Point> fm;

  fm.emplace(std::piecewise_construct,
             std::forward_as_tuple(3, 'C'), // キーの型std::stringのコンストラクタ引数を渡す
             std::forward_as_tuple(1, 2));  // 値の型Pointのコンストラクタ引数を渡す

  fm.emplace(std::piecewise_construct,
             std::forward_as_tuple(3, 'A'),
             std::forward_as_tuple(3, 4));

  fm.emplace(std::piecewise_construct,
             std::forward_as_tuple(3, 'B'),
             std::forward_as_tuple(5, 6));

  for (const auto& [key, value] : fm) {
    std::cout << key << " : (" << value.x << ", " << value.y << ')' << std::endl;
  }
}
```
* emplace[color ff0000]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]

#### 出力
```
AAA : (3, 4)
BBB : (5, 6)
CCC : (1, 2)
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
| [`flat_map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |
| [`flat_map::try_emplace`](try_emplace.md)           | キーが存在しない場合のみ要素を直接構築する |

