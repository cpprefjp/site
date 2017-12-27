# empty
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
bool empty() const noexcept;
```

## 概要
コンテナが空かどうかをテストする。 
`map` コンテナが空（[`size()`](/reference/map/map/size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](/reference/map/map/clear.md) メンバを使う。


## 戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false`。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main ()
{
  std::map<int, char> m;

  std::cout << m.empty() << std::endl;

  m.insert(std::make_pair(42, 'a'));

  std::cout << m.empty() << std::endl;

  return 0;
}
```
* empty()[color ff0000]
* m.insert[link insert.md]

### 出力
```
1
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012

## 関連項目

| 名前 | 説明|
|---------------------------------------------------------------------------------------|-----------------------|
| [`map::insert`](/reference/map/map/insert.md) | 要素を挿入する |
| [`map::(constructor)`](/reference/map/map/op_constructor.md) | コンストラクタ |


