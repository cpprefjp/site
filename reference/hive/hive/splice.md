# splice
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void splice(hive& x);  // (1) C++26
void splice(hive&& x); // (2) C++26
```

## 概要
他の`hive`オブジェクト`x`の全ての要素を`*this`に移動して連結する。


## 事前条件
`get_allocator() == x.get_allocator()`が`true`であること。


## 効果
- [`addressof`](/reference/memory/addressof.md)`(x) == this`が`true`である場合、その動作はエラー性動作（erroneous behavior）であり、何もしない。
- 例外が送出された場合、何もしない。
- そうでなければ、`x`の全ての要素を`*this`に移動し、`x`を空にする。移動された`x`の要素を指すポインタおよび参照は、`*this`のメンバとしての同じ要素を指すようになる。移動された要素を指すイテレータは、引き続き同じ要素を指すが、`x`ではなく`*this`のイテレータとして振る舞う。


## 戻り値
なし


## 例外
`x`のアクティブブロックのうち、いずれかが[`block_capacity_limits()`](block_capacity_limits.md)の範囲内にない場合、`length_error`例外を送出する。また、アロケータが送出するあらゆる例外を送出する。


## 計算量
`x`の全ての要素ブロック数と`*this`の全ての要素ブロック数の総和に対して線形時間


## 備考
- `x`の予約ブロックは`*this`に移動されない。
- [`addressof`](/reference/memory/addressof.md)`(x) == this`が`false`である場合、`x`と`*this`の両方の終端イテレータを無効化する。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h1 = {1, 2, 3};
  std::hive<int> h2 = {4, 5, 6};

  // h2の全ての要素をh1に移動して連結する
  h1.splice(h2);

  std::println("h1.size() = {}", h1.size());
  std::println("h2.empty() = {}", h2.empty());
}
```
* splice[color ff0000]
* h1.size()[link size.md]
* h2.empty()[link empty.md]

### 出力
```
h1.size() = 6
h2.empty() = true
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::insert`](insert.md)
- [`hive::block_capacity_limits`](block_capacity_limits.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
