# emplace_hint
* map[meta header]
* std[meta namespace]
* map[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

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
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


## 備考
- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照やイテレータは無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- C++17 で導入された [`try_emplace`](try_emplace.md) と異なり、たとえ要素が挿入されなかった場合でも `value_type` 型のオブジェクトが構築される可能性があり、結果として引数 `args` が [`move`](/reference/utility/move.md) の対象となって変更されてしまっている可能性があるため、注意が必要である。


## 例
```cpp example
#include <iostream>
#include <map>
#include <utility>

int main()
{
  std::map<int, char> m;

  m.emplace( 1, 'A' );

  // キー2の要素が最後尾に追加されることが事前にわかっているので、m.end()をヒントとして与える
  m.emplace_hint( m.end(), 2, 'B' );

  for( const auto& pr : m ) {
    std::cout << std::get<0>( pr ) << " " << std::get<1>( pr ) << std::endl;
  }

  return 0;
}
```
* emplace_hint[color ff0000]
* m.emplace[link emplace.md]
* m.end()[link end.md]
* std::get[link /reference/utility/pair/get.md]

### 出力
```
1 A
2 B
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.8.5 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`map::insert`](insert.md)                     | 要素を挿入する                             |
| [`map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`map::try_emplace`](try_emplace.md)           | キーが存在しない場合のみ要素を直接構築する |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
