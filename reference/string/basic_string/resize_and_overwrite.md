# resize_and_overwrite
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <class Operation>
constexpr void resize_and_overwrite(size_type n, Operation op); // C++23
```

## 概要
任意の初期化を伴って、文字列の長さを変更する。

本関数は、`string` にいくつかの文字列をまとめて追加・代入する際に、パフォーマンスを向上させる目的で追加された。


## 適格要件

`Operation`型の値 `op` は、下記を満たす呼び出し可能な型であること。

- 式`std::move(op)(data(), n)` が有効（第1引数 `data()` は `charT*`型、第2引数 `n` は `size_type`型）。
- 戻り値型は `integer-like` を満たす。


## 事前条件

- 呼び出された `op` が例外を投げないこと。
- `op` の呼び出しで、第1引数・第2引数ともに変更されないこと。
- `r = std::move(op)(data(), n)` とすると、`0 <= r && r <= n` であること。
- `[data(), data() + r)` の範囲に未初期化の要素がないこと。


## 効果
1. 関数実行前に `[`[`data()`](data.md)`,` [`data()`](data.md) `+ n)` が有効範囲でないなら、領域の確保が行われる（[`reserve(n)`](reserve.md) 相当）。新たな領域は初期化されないことに注意。
1. `std::move(op)(data(), n)` が呼ばれる。`op` 内では、`[`[`data()`](data.md)`,` [`data()`](data.md) `+ n)` の範囲に対して任意の初期化を行う。
1. `op` の戻り値を `r` とすると、サイズを `r` に変更する。


## 戻り値
なし


## 例
```cpp example
#include <cstring>
#include <iostream>
#include <string>
#include <string_view>

constexpr std::string_view sentence[9] = {
    "The", "quick", "brown", "fox", "jumps",
    "over", "the", "lazy", "dog"
};
constexpr size_t BUF_SIZE = 256;

int main() {
    // reserve()を用いる例。memcpy()よりも処理の重いappend()がループ内で呼ばれる
    {
        std::string s;

        s.reserve(BUF_SIZE); // Good: 領域確保のみ
        for (auto word : sentence) {
            s.append(word); // Not good: ループの回数だけデータサイズ変更処理が行われる
        }

        std::cout << s.size() << ": " << s << std::endl;
    }

    // resize()を用いる例。resize()呼び出し時に（ここでは不要な）ゼロ初期化が行われる
    {
        std::string s;

        int pos = s.size();
        s.resize(BUF_SIZE); // Not good: ゼロ初期化が行われる
        for (auto word : sentence) {
            memcpy(s.data() + pos, word.data(), word.size()); // Good: データコピーのみ
            pos += word.size();
        }
        s.resize(pos);

        std::cout << s.size() << ": " << s << std::endl;
    }

    // resize_and_overwrite()を用いる例。領域確保時のゼロ初期化がなく、ループ内ではmemcpy()呼ぶ
    {
        std::string s;

        s.resize_and_overwrite(BUF_SIZE, [ini_pos = s.size()](char* buf, size_t buf_size) { // Good: ゼロ初期化は行われない
            int pos = ini_pos;
            for (auto word : sentence) {
                memcpy(buf + pos, word.data(), word.size()); // Good: データコピーのみ
                pos += word.size();
            }
            return pos; // サイズを返す
        });

        std::cout << s.size() << ": " << s << std::endl;
    }
}
```
* resize_and_overwrite[color ff0000]
* resize[link resize.md]
* reserve[link reserve.md]

### 出力
```
35: Thequickbrownfoxjumpsoverthelazydog
35: Thequickbrownfoxjumpsoverthelazydog
35: Thequickbrownfoxjumpsoverthelazydog
```

## 参照

- [P1072R10 basic_string::resize_and_overwrite](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1072r10.html)
