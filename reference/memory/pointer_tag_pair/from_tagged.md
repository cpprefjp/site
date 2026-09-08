# from_tagged
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
static pointer_tag_pair from_tagged(tagged_pointer_type p) noexcept; // (1) C++29
```

## 概要
タグを下位ビットへ埋め込んだままの生のポインタ値から、`pointer_tag_pair`オブジェクトを復元する。

[`tagged_pointer()`](tagged_pointer.md)の逆操作であり、既存のポインタタギング実装との相互運用のために提供される。


## 戻り値
- `p`が、互換な特殊化のオブジェクト`sp`の`sp.`[`tagged_pointer()`](tagged_pointer.md)と等値である場合、`sp`と同じポインタ値・タグ値を持つオブジェクトを返す
- そうでない場合、ポインタ値とタグ値は未規定となる


## 例外
投げない。


## 備考
- 復元の保証は、元の`sp`のポインタのアライメントとタグのビット数が、復元先の特殊化の`bits_requested`と両立する場合にのみ与えられる
- 未検証の値からの復元は誤った結果になりうる危険な操作であるため、意図が目立つよう、独立した冗長な名前の関数として提供される


## 例
```cpp
#include <memory>
#include <iostream>

// ユーザーデータをvoid*で受け渡す、既存のC形式のAPI
void invoke_callback(void (*callback)(void*), void* user_data)
{
  callback(user_data);
}

void on_event(void* user_data)
{
  // 受け取った生のポインタ値から、ポインタとタグを復元する
  auto p = std::pointer_tag_pair<int*, 1, bool>::from_tagged(user_data);

  if (p.tag()) {
    std::cout << "urgent: " << *p.pointer() << std::endl;
  }
  else {
    std::cout << "normal: " << *p.pointer() << std::endl;
  }
}

int main()
{
  int value = 42;

  // 「緊急かどうか」をポインタの下位1ビットに埋め込んで、
  // void*ひとつだけを渡せるAPIへ追加の情報を持ち込む
  std::pointer_tag_pair<int*, 1, bool> p{&value, true};
  invoke_callback(on_event, p.tagged_pointer());
}
```
* from_tagged[color ff0000]
* std::pointer_tag_pair[link ../pointer_tag_pair.md]
* p.tagged_pointer()[link tagged_pointer.md]
* p.tag()[link tag.md]
* p.pointer()[link pointer.md]

### 出力
```
urgent: 42
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
