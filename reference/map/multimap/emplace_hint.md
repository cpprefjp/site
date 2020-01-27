# emplace_hint
* map[meta header]
* std[meta namespace]
* multimap[meta class]
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
挿入された要素へのイテレータを返す。


## 計算量
一般にコンテナのサイズについて対数時間だが、新しい要素が `hint` の前に挿入された場合は償却定数時間。


## 例
```cpp example
#include <iostream>
#include <map>
#include <utility>

int main()
{
  std::multimap<int, char> m;

  m.emplace( 1, 'A' );

  // �ー2の要素が最後尾に追加されることが事前にわかっているので、m.end()をヒントとして与える
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
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.8.5
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 関連項目

| 名前 | 説明 |
|-----------------------------------------------------------------------------------------|-----------------------------|
| [`multimap::emplace`](/reference/map/multimap/emplace.md) | 要素を直接構築する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

