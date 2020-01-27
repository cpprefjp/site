# emplace
* map[meta header]
* std[meta namespace]
* map[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool> emplace(Args&&... args);
```
* pair[link /reference/utility/pair.md]

## 概要
コンテナに新しい要素を挿入する。要素は直接構築される（コピーもムーブもされない）。要素のコンストラクタはこの関数に渡された引数を与えることによって呼ばれる。


## パラメータ
- `args...` : 要素のコンストラクタへ転送される引数パック。

## 戻り値
挿入されたかどうかを示す `bool` と、挿入された要素へのイテレータからなる [`pair`](/reference/utility/pair.md) を返す。挿入されなかったときは、既�要素へのイテレータを返す。


## 計算量
コンテナサイズについて対数時間。


## 備考
C++17 で導入された [`try_emplace`](try_emplace.md) と異なり、たとえ要素が挿入されなかった場合でも `value_type` 型のオブジェクトが構築される可能性があり、結果として引数 `args` が [`move`](/reference/utility/move.md) の対象となって変更されてしまっている可能性があるため、注意が必要である。


## 例
### 単純な�ー・値を挿入する例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m;

  // �ーと値の組を作ることなく挿入できる
  m.emplace(3, 'A'); // �ー3と、値'A'を挿入
  m.emplace(1, 'B');
  m.emplace(4, 'C');

  for (const auto& x : m) {
    std::cout << x.first << " : " << x.second << std::endl;
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

### �ーと値もそれぞれコンストラクタ引数を渡す例
```cpp example
#include <iostream>
#include <map>
#include <string>
#include <tuple>

struct Point {
  int x, y;
  Point(int x, int y) : x(x), y(y) {}
};

int main()
{
  std::map<std::string, Point> m;

  m.emplace(std::piecewise_construct,
            std::forward_as_tuple(3, 'C'), // �ーの型std::stringのコンストラクタ引数を渡す
            std::forward_as_tuple(1, 2));  // 値の型Pointのコンストラクタ引数を渡す

  m.emplace(std::piecewise_construct,
            std::forward_as_tuple(3, 'A'),
            std::forward_as_tuple(3, 4));

  m.emplace(std::piecewise_construct,
            std::forward_as_tuple(3, 'B'),
            std::forward_as_tuple(5, 6));

  for (const auto& x : m) {
    std::cout << x.first << " : (" << x.second.x << ", " << x.second.y << ')' << std::endl;
  }
}
```
* emplace[color ff0000]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* std::forward_as_tuple[link /reference/tuple/forward_as_tuple.md]

#### 出力
```
AAA : (3, 4)
BBB : (5, 6)
CCC : (1, 2)
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 3.3
- [GCC](/implementation.md#gcc): 4.8.5
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`map::insert`](insert.md)                     | 要素を挿入する                             |
| [`map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |
| [`map::try_emplace`](try_emplace.md)           | �ーが�在しない場合のみ要素を直接構築する |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

