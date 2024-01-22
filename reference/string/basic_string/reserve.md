# reserve
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void reserve(size_type res_arg = 0);       // (1)+(2) C++03

void reserve();  // (1) C++20で非推奨化, C++26で削除

constexpr void reserve(size_type res_arg); // (2) C++20
```

## 概要
`basic_string` が最適にメモリを確保できるよう、あらかじめサイズ変更の予定を指示する。


## 効果
- C++03 : [`capacity()`](capacity.md) `>= res_arg` となる
- C++20 : 現在の[`capacity()`](capacity.md)が`res_arg`より小さい場合に限り、[`capacity()`](capacity.md) `>= res_arg` となるようメモリの伸長をリクエストする


## 戻り値
なし


## 例外
`res_arg >` [`max_size()`](max_size.md) の場合、[`length_error`](/reference/stdexcept.md) 例外を投げる。  
`allocator_traits<Allocator>::allocate()` が、よりふさわしい例外を投げるかもしれない。


## 非推奨・削除の詳細
C++03で`reserve`操作でのメモリの縮小ができたことは、以下の問題があった：

- パフォーマンスの罠となっていた。この関数に指定する引数の値を慎重に選ばなければ、予想外の動的な再確保によってパフォーマンスを低下させる原因となっていた
- 移植性の壁になっていた。メモリ縮小は実装に任せられたオプション機能であったため、環境による動作の違いがあった
- [`vector`](/reference/vector/vector.md)と`string`でのコードの汎用化がむずかしくなっていた。[`vector::reserve()`](/reference/vector/vector/reserve.md)はメモリ伸長のみをサポートしていたが、`string`側はメモリ縮小もサポートしていたため、引数の値を計算することが難しかった
- メモリ縮小のためには[`shrink_to_fit()`](shrink_to_fit.md)メンバ関数があるため、そちらと重複する機能であった

これらのことから、C++20では、メモリ縮小を許可しているように見えるデフォルト引数`0`を非推奨化し、メモリ縮小機能を効果から削除した。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s;
  s.reserve(3);

  // 確保したサイズを確認
  std::size_t cap = s.capacity();
  std::cout << cap << std::endl;

  // reserveしたサイズを越えない限り、
  // push_backのたびにメモリの再確保が起こらない
  s.push_back('a');
  s.push_back('b');
  s.push_back('c');
}
```
* reserve[color ff0000]
* s.capacity()[link capacity.md]
* s.push_back[link push_back.md]

### 出力例
```
3
```

## 参照
- [P0966R1 `string::reserve` Should Not Shrink](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0966r1.html)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P2870R3 Remove `basic_string::reserve()` From C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2870r3.pdf)
