# emplace_front
* list[meta header]
* std[meta namespace]
* list[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace_front(Args&&... args);         // C++14 まで

template <class... Args>
reference emplace_front(Args&&... args);    // C++17 から
```

## 概要
直接構築で新たな要素を先�に追加する。

この関数の引数 `args...` は、要素型 `value_type` のコンストラクタ引数である。当関数の内部で要素型 `value_type` のコンストラクタを呼び出し、追加する要素を構築する。


## テンプレートパラメータ制約
- `value_type` は、コンテナに対して `args` から直接構築可能であること


## 戻り値
- C++14 まで：なし
- C++17 から：構築した要素への参照


## 計算量
定数時間


## 備考
- この関数の呼び出し後も、全てのイテレータ、および、参照は無効化されない。
- 操作�に例外が発生した場合、副作用は発生しない。


## 例
```cpp example
#include <iostream>
#include <list>
#include <utility>
#include <string>

int main()
{
  std::list<std::pair<int, std::string>> ls;

  ls.emplace_front(1, std::string("world"));
  ls.push_front(std::make_pair(3, std::string("hello")));

  for (const auto& x : ls) {
    std::cout << x.first << ',' << x.second << std::endl;
  };
}
```
* emplace_front[color ff0000]
* ls.push_front[link push_front.md]

### 出力
```
3,hello
1,world
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                | 説明                           |
|-------------------------------------|--------------------------------|
| [`emplace_back`](emplace_back.md)   | 末尾への直接構築による要素追加 |
| [`push_front`](push_front.md)       | 先�に要素を追加する           |
| [`push_back`](push_back.md)         | 末尾に要素を追加する           |
| [`emplace`](emplace.md)             | 要素の直接構築による挿入       |
| [`insert`](insert.md)               | 要素の挿入                     |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [P0084R0 Emplace Return Type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0084r0.pdf)
- [P0084R1 Emplace Return Type (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r1.pdf)
- [P0084R2 Emplace Return Type (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r2.pdf)
