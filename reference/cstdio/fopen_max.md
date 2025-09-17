# FOPEN_MAX
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define FOPEN_MAX unspecified
```
* unspecified[italic]

## 概要
処理系によって保証されるファイルを同時に開ける最低限の数を表すマクロ。

このマクロは、プログラムが同時にオープンできるファイルの最低限の数を定義する。値は実装依存であり、最低でも8以上であることがC標準によって保証されている。実際の実装では、より大きな値（例：16、256など）が使用されることが多い。

また、`FOPEN_MAX`は[`TMP_MAX`](/reference/cstdio/tmp_max.md.nolink)と等しいかそれより大きいことが保証される。

## 備考
- この値は最低限の保証値であり、実際にはより多くのファイルを開ける場合がある
- システムリソースやOS固有の制限により、この値未満しかファイルを開けない場合もある
- `FOPEN_MAX`で開けるファイルの数は、標準で開かれている3つのストリームも含むため、実際に新たに開けるファイルの数は`FOPEN_MAX - 3`個となる

## 例
```cpp example
#include <cstdio>
#include <vector>
#include <filesystem>
#include <format>

int main() {
  // FOPEN_MAXの値を表示
  std::printf("FOPEN_MAX = %d\n", FOPEN_MAX);

  // 作業用ディレクトリを作成
  std::filesystem::path work_dir = "temp_fopen_test";
  std::filesystem::create_directory(work_dir);

  // 複数のファイルを開いてみる（標準ストリーム3つを除く）
  std::vector<std::FILE*> files;
  const int max_new_files = FOPEN_MAX - 3; // 標準ストリーム分を除く

  for (int i = 0; i < max_new_files; ++i) {
    auto filepath = work_dir / std::format("temp{}.txt", i);
    std::FILE* file = std::fopen(filepath.string().c_str(), "w");
    if (file) {
      files.push_back(file);
      std::fprintf(file, "File %d\n", i);
    } else {
      std::printf("Failed to open file %d\n", i);
      break;
    }
  }

  std::printf("Successfully opened %zu files\n", files.size());

  // ファイルを閉じる
  for (std::FILE* file : files) {
    std::fclose(file);
  }

  // 作業用ディレクトリごと削除
  std::filesystem::remove_all(work_dir);

  return 0;
}
```
* FOPEN_MAX[color ff0000]
* std::printf[link /reference/cstdio/printf.md]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fprintf[link /reference/cstdio/fprintf.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::format[link /reference/format/format.md]
* std::filesystem::create_directory[link /reference/filesystem/create_directory.md]
* std::filesystem::remove_all[link /reference/filesystem/remove_all.md]

### 出力例
```
FOPEN_MAX = 20
Successfully opened 17 files
```

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??